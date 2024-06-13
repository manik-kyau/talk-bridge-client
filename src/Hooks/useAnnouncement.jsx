// import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAnnouncement = () => {

    const axiosPublic = useAxiosPublic();

    const {data: announcements = [], isPending: loading, refetch} = useQuery({
        queryKey: ['announcements'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    });

    return [announcements,loading,refetch];
};

export default useAnnouncement;