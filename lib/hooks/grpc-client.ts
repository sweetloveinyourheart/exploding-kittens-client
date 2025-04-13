"use client"

import { GrpcContext } from "@/contexts/grpcClient";
import { useContext } from "react";

export const useGrpcClient = () => {
    const context = useContext(GrpcContext);
    if (!context) {
        throw new Error('useGrpcClient must be used within a GrpcProvider');
    }
    return context;
};