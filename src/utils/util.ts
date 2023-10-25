import { MessageApi } from 'naive-ui'

/**
 * 防抖函数
 *
 * @returns MessageApi
 */
export const message = function (): MessageApi {
    return (window as any).$message
}

/**
 * Returns a formatted timestamp string in the format of "YYYY-MM-DD HH:mm:ss".
 * If no timestamp is provided, the current date and time will be used.
 * @param timestamp - Optional timestamp in milliseconds since Unix epoch.
 * @returns Formatted timestamp string.
 */
export const getFormattedTimestamp = (timestamp?:number): string => {
    const date = timestamp?new Date(timestamp):new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }