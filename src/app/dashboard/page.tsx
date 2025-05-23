import React from 'react';
import DashboardOverview from "@/components/dashboard-overview";
import {get_dashboard_data} from "@/server/auth";

const Dashboard_Overview = async () => {
    const {data} = await  get_dashboard_data()
    if(!data) return
    return (
        <div>
            <DashboardOverview data={data} />
        </div>
    );
};

export default Dashboard_Overview;