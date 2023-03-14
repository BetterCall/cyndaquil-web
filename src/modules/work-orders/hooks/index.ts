import { useCreateWorkOrder } from "./useCreateWorkOrder";
import { useGenerateFromContract } from './useGenerateFromContract'
import { useGenerateFromWorkOrder } from './useGenerateFromWorkOrder'

import { useUpdateWorkOrder } from "./useUpdateWorkOrder";
import { useWorkOrder, useLazyWorkOrder } from "./useWorkOrder";
import { useLazyWorkOrders, useWorkOrders } from "./useWorkOrders";

export {
    useGenerateFromContract,
    useGenerateFromWorkOrder,
    useCreateWorkOrder,
    useUpdateWorkOrder,
    useWorkOrder, useLazyWorkOrder,
    useLazyWorkOrders, useWorkOrders,
}