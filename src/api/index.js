import axiosInstance from '@/utils/http'


// 通义千问api
export const tongYiApi = (params) => {
    return axiosInstance({
        url: '/qwen/api/v1/services/aigc/text-generation/generation',
        method: 'post',
        data: params,
        timeout: 100000
    })
}