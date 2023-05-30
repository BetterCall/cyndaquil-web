import { useForm } from "react-hook-form";
import { useState } from "react";
import { authTokenVar, url } from "../../../apollo";
import { useLazyUploads, useUploads } from "./useUploads";


interface IProps {
    defaultValues: any
    onCompleted: (id: number) => any
    onError?: (msg: string) => any
}

export const useCreateUpload = ({ defaultValues, onCompleted, onError }: IProps) => {

    const [reload] = useLazyUploads();

    const form = useForm<any>({
        mode: "all",
        defaultValues
    })
    const [loading, setLoading] = useState(false)
    const submit = async () => {
        if (loading) return
        setLoading(true)
        try {
            const { file, database, objectId, informations, category } = form.getValues()
            const formBody = new FormData();
            formBody.append("file", file[0]);
            console.log('file', file[0])
            formBody.append("database", database);
            formBody.append("objectId", objectId);
            formBody.append("informations", informations);
            formBody.append("category", category);
            const requestOptions = {
                method: 'POST',
                headers: {
                    "x-jwt": authTokenVar() || ""
                },
                body: formBody
            };
            const response = await fetch(url + '/uploads', requestOptions);
            const data = await response.json();



            if (data?.ok) {
                const { data: nData } = await reload({ variables: { where: { ...defaultValues } }, fetchPolicy: "network-only" })
                console.log(nData)
                onCompleted(data?.createSite?.id)
            } else {
                throw Error(data?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
            onError?.(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {
        form,
        loading,
        submit
    }
}

