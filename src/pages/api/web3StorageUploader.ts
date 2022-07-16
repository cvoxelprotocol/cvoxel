import { IncomingForm } from "formidable";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async function web3StorageUpload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = process.env.WEB3_STORAGE_TOKEN;
    if (!token) {
      respondError(req, res, "No api token");
      return;
    }

    const client = new Web3Storage({ token });
    const data = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        const form = new IncomingForm({
          multiples: false,
        });
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.log("err", err);
            reject(err);
            return;
          }
          resolve({ fields, files });
        });
      }
    );

    if (!data?.files.file[0].filepath) {
      respondError(req, res, "No File Data");
      return;
    }

    const files = await getFilesFromPath(data?.files.file[0].filepath);
    const rootCid = await client.put(files);
    res.statusCode = 200;
    res.json({ cid: rootCid });
    res.end();
  } catch (error) {
    console.log("error", error);
    respondError(req, res, JSON.stringify(error));
  }
}

const respondError = (
  req: NextApiRequest,
  res: NextApiResponse,
  text: string
) => {
  res.statusCode = 500;
  res.json({
    method: req.method,
    error: text,
  });
  res.end();
};
