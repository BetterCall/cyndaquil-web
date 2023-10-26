import { useCreateWorkOrder } from "./useCreateWorkOrder";
import { useGenerateFromContract } from './useGenerateFromContract'
import { useGenerateFromWorkOrder } from './useGenerateFromWorkOrder'

import { useUpdateWorkOrder } from "./useUpdateWorkOrder";
import { useWorkOrder, useLazyWorkOrder } from "./useWorkOrder";
import { useLazyWorkOrders, useWorkOrders } from "./useWorkOrders";
import { useLazyWorkOrdersByIds, useWorkOrdersByIds } from "./useWorkOrdersByIds";

export {
    useGenerateFromContract,
    useGenerateFromWorkOrder,
    useCreateWorkOrder,
    useUpdateWorkOrder,
    useWorkOrder, useLazyWorkOrder,
    useLazyWorkOrders, useWorkOrders,
    useLazyWorkOrdersByIds, useWorkOrdersByIds
}