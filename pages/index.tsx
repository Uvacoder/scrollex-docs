import { Box, Heading, HStack, Text, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import InlineCode from "../components/InlineCode";
import Project from "../components/Project";
import styles from "../styles/Home.module.css";
// import TutorialMdx from "../posts/reorder-list.mdx";
import TutorialMdx from "../posts/scroll.mdx";
import SandpackCodeBlock from "../components/SandpackCodeBlock";
import Layout from "../components/Layout";
import { getMdxComponents } from "../components/mdx";

const Home: NextPage = () => {
  return (
    <Layout>
      <Project theme="sandpack-dark">
        <Box>
          <TutorialMdx components={getMdxComponents({ useSandpack: true })} />
        </Box>
      </Project>
    </Layout>
  );
};

export default Home;
