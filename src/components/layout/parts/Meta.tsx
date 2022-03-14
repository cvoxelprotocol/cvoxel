import Head from 'next/head'
import { FC } from 'react'

const OGP_IMAGE="https://testnet.cvoxel.xyz/ogp_cvoxel.jpg"

interface MetaData {
    pageTitle?: string
    pageDescription?: string
    pagePath?: string
    pageImg?: string
    pageImgWidth?: number
    pageImgHeight?: number
  }

export const Meta:FC<MetaData> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight
}) => {
    const defaultTitle = 'C-Voxel'
    const defaultDescription = 'C-Voxel - Stack Your Own Career on Web3.0'
  
    const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
    const description = pageDescription ? pageDescription : defaultDescription
    const url = pagePath
    const imgUrl = pageImg ? pageImg : OGP_IMAGE
    const imgWidth = pageImgWidth ? pageImgWidth : 1200
    const imgHeight = pageImgHeight ? pageImgHeight : 630

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" key="viewport"/>
      <meta name="description" content={description} key="description"/>
      <meta property="og:url" content={url} key="ogurl"/>
      <meta property="og:title" content={title} key="ogtitle"/>
      <meta property="og:site_name" content={title} key="ogsite_name"/>
      <meta property="og:description" content={description} key="ogdescription"/>
      <meta property="og:type" content="website" key="ogtype"/>
      <meta property="og:image" content={imgUrl} key="ogimage"/>
      <meta property="og:image:width" content={String(imgWidth)} key="ogimagewidth"/>
      <meta property="og:image:height" content={String(imgHeight)} key="ogimageheight"/>
      <link rel="canonical" href={url} key="canonical"/>
      <meta name="twitter:card" content="summary_large_image" key="twittercard"/>
    </Head>
  )
}
