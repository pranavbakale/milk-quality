
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {InsightPage} from 'src/sections/insights/insights-info';


const Page = () =>{
  return( 
    <>
    <Head>
      <title>
        Data Parameters
      </title>
    </Head>
    <InsightPage />
  </>
)};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;