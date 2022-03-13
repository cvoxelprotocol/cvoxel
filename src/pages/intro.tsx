import Button from "@/components/common/Button";
import BurgerMenu from "@/components/layout/BurgerMenu";
import { NextPage } from "next";
import Image from "next/image";

const Intro: NextPage = () => {
  var menuStyles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      right: "36px",
      top: "64px",
    },
    bmBurgerBars: {
      background: "#A66497",
      height: "7%",
    },
    bmBurgerBarsHover: {
      background: "#EFA9E0",
    },
    bmCrossButton: {
      height: "40px",
      width: "40px",
      top: "40px",
      right: "48px",
    },
    bmCross: {
      background: "#EFA9E0",
      width: "30px",
      height: "2px",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#FFFFFF",
      borderBottomLeftRadius: "1em",
      borderTopLeftRadius: "1em",
      padding: "2.5em 1.5em 0",
      fontSize: "1.5em",
      font: "Work Sans",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#8E477F",
      padding: "0em",
      paddingLeft: "0",
    },
    bmItem: {
      display: "block",
      margin: "0.75em 0em",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };
  return (
    <div id="outer-container">
      <div className="block md:hidden">
        <BurgerMenu styles={menuStyles} right />
      </div>
      {/* Header of this page */}
      <header className="flex justify-center w-full pt-10 px-8">
        <nav className="w-[1200px] h-20 grid grid-cols-2">
          <div className="flex w-full items-center">
            <Image
              src="/C-Voxel_logotype@4x.png"
              height="36px"
              width="171px"
              alt="C-Voxel icon"
            />
          </div>

          <div className="hidden md:flex w-full justify-end items-center text-normal text-text-primary ">
            <a className="mx-4" href="https://github.com/cvoxelprotocol">
              Github
            </a>
            <a className="mx-4" href="https://discord.gg/JxDKhkMab3">
              Discord
            </a>
            <button className="hidden mx-4">Docs</button>
            <Button
              text="Go to App"
              href="/"
              color="grad-red"
              variant="contained"
              className="hidden md:block ml-6 tracking-wide"
            />
          </div>
        </nav>
      </header>
      {/* Main contents of this page */}
      <main className="w-full " id="page-wrap">
        <section className="flex w-full h-[700px] md:h-[900px] justify-center items-center">
          <div className="flex justify-center md:justify-start items-center mx-8 h-full w-[1200px] relative ">
            <Image
              className="relative"
              src="/C-Voxel_lg_logomark@4x.png"
              width="503px"
              height="550px"
              layout="intrinsic"
              alt="Large Logomark"
            />
            <div className="absolute top-40 md:top-60 z-10 w-full text-6xl md:text-8xl text-text-primary font-semibold text-center md:text-right drop-shadow-xl-white md:drop-shadow-none">
              <p>
                <span className="font-bold md:drop-shadow-xl-white">
                  Stack{" "}
                </span>
                Your Career
              </p>
              <p>
                {" "}
                on <span className=" font-bold">Web3.0</span>
              </p>
              <p className="my-4 text-xl md:text-2xl font-normal text-center md:text-right">
                <p>You can change your transactions into “C-Voxel”</p>
                <p>and easiliy share them on Web3.0</p>
                <p>as your on-chain CV.</p>
              </p>
              <div className="flex justify-center md:justify-end">
                <Button
                  text="Go to App"
                  href="/"
                  color="grad-red"
                  variant="contained"
                  className="float-right block tracking-wide"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What's C-Voxel ? */}
        <section className="flex justify-center w-full h-auto bg-primary/20">
          <div className="flex flex-col px-8 w-[1200px] h-auto items-center">
            <div className="w-full">
              <h3 className="self-start relative -top-5 -left-28 h-fit w-fit pl-[120px] pr-10 py-3 bg-primary-300 text-xl md:text-4xl text-text-white font-semibold">
                What&apos;s C-Voxel
              </h3>
            </div>
            <div className="flex flex-col-reverse lg:flex-row w-full h-full items-center justify-between">
              <div className="w-auto pt-10 md:pt-20 pb-32 text-2xl text-text-primary text-normal">
                <h3 className="mb-4 text-4xl text-medium font-semibold">
                  Proof-of-Career Protocol
                </h3>
                <p className="text-justify">
                  <p>
                    C-Voxel is a voxel that has your work data tied to your Tx
                    hash. It can be created by very simple steps with{" "}
                    <strong className="font-bold">NO FEES</strong>.
                  </p>
                  <p className="my-2">
                    Your “C-Voxel Collection” became your own on-chain CV and a
                    part of <strong className="font-bold">your DID</strong>.
                  </p>
                  <p>
                    Let’s share your C-Voxel to your DAO member and make it easy
                    to proof your career !!
                  </p>
                </p>
              </div>
              <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-40 md:mr-20">
                <Image
                  src="/voxel_image.png"
                  width="268px"
                  height="309"
                  layout="intrinsic"
                  alt="voxel image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Powered by ceramic */}
        <section className="my-20 flex justify-center">
          <div className="flex flex-col items-center mb-40 text-black font-normal text-2xl">
            <p className="mb-8">Powered by</p>

            <Image
              src="/ceramic_logo.png"
              width="317px"
              height="80px"
              alt="ceramic network"
            />
          </div>
        </section>
      </main>

      {/* 3 Step to create */}
      <section className="">
        <div className="flex justify-center">
          <div className="px-4 pb-2 border-b-2 border-text-primary text-text-primary text-2xl md:text-4xl font-semibold tracking-wide">
            3 STEPs to Mint!
          </div>
          {/* <Image
            src="/3step_to_mint.png"
            width="503px"
            height="108px"
            alt="3steps to mint"
          /> */}
        </div>
        {/* contents 1 */}
        <div className="flex justify-center py-40 w-full ">
          <div className="flex flex-col mx-8 lg:flex-row w-[1200px] items-center">
            <div className="lg:mr-20">
              <Image
                src="/step1.png"
                width="364px"
                height="379px"
                layout="intrinsic"
                alt="step1 image"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:mx-0">
              <div className="mr-5 mt-8 lg:mt-0 mb-4 lg:mb-0">
                <Image
                  src="/deco_1.png"
                  width="44px"
                  height="40px"
                  layout="fixed"
                  alt="step1 deco"
                />
              </div>
              <div className=" max-w-xl text-text-primary text-3xl md:text-4xl leading-[1.5] font-medium">
                <p>
                  Add your work summary to your existing transaction on C-Voxel
                  App and claim.
                </p>
                <p>At the time, a Semi C-Voxel will be minted.</p>
              </div>
            </div>
          </div>
        </div>
        {/* contents 2 */}
        <div className="flex justify-center py-40 w-full bg-primary/20">
          <div className="flex flex-col mx-8 lg:flex-row-reverse w-[1200px] items-center">
            <div className="lg:ml-20">
              <Image
                src="/step2.png"
                width="457px"
                height="260px"
                layout="intrinsic"
                alt="step1 image"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:mx-0">
              <div className="mr-5 mt-8 lg:mt-0 mb-4 lg:mb-0">
                <Image
                  src="/deco_2.png"
                  width="44px"
                  height="40px"
                  layout="fixed"
                  alt="step1 deco"
                />
              </div>
              <div className=" max-w-xl text-text-primary text-3xl md:text-4xl leading-[1.5] font-medium">
                <p>
                  Just Ask for a sign to payer of the transaction via discord,
                  e-mail and twitter etc...
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* contents 3 */}
        <div className="flex justify-center py-40 w-full ">
          <div className="flex flex-col mx-8 lg:flex-row w-[1200px] items-center">
            <div className="lg:ml-20 lg:mr-40">
              <Image
                src="/step3.png"
                width="202px"
                height="245px"
                layout="intrinsic"
                alt="step1 image"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:mx-0">
              <div className="mr-5 mt-8 lg:mt-0 mb-4 lg:mb-0">
                <Image
                  src="/deco_3.png"
                  width="44px"
                  height="40px"
                  layout="fixed"
                  alt="step1 deco"
                />
              </div>
              <div className=" max-w-xl text-text-primary text-3xl md:text-4xl leading-[1.5] font-medium">
                <p>
                  That’s it! Once the payer signs, you get your very own
                  C-Voxel!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section>
        <div className="flex justify-center items-center mb-56">
          <Button
            text="Mint your C-Voxel"
            color="grad-red"
            href="/"
            variant="contained"
            className="block mx-6 tracking-wide"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="flex px-5 justify-center w-full h-20 bg-primary-300">
        <div className="grid grid-cols-2 items-center w-[1200px]">
          <p className="text-text-white text-base">©️ C-Voxel-2022</p>
        </div>
        <div className="flex justify-end items-center">
          <a>
            <Image
              src="/github_logo.png"
              width="28px"
              height="28px"
              layout="fixed"
              alt="github logo"
            />
          </a>
          <div className="mx-4">
            <Image
              src="/twitter_logo.png"
              width="28px"
              height="24px"
              alt="twitter logo"
              layout="fixed"
            />
          </div>
          <div>
            <Image
              src="/discord_logo.png"
              width="28px"
              height="21px"
              alt="discord logo"
              layout="fixed"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Intro;