import { FC } from "react";

import Head from "next/head";

import { Navbar, SideMenu } from '../ui';

interface Props {
    children: JSX.Element | JSX.Element[];
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription} />

            <meta name="og:title" content={ title} />
            <meta name="og:description" content={ pageDescription} />

            {
                imageFullUrl && (
                    <meta name="og:description" content={ imageFullUrl} />

                )
            }

        </Head>
        <nav>
            {/* TODO: Navbar */}
            <Navbar />
        </nav>

        {/* TODO: Sidebar */}
        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        <footer>
            {/* Poner el custom footer  */}
        </footer>

    </>
  )
}
