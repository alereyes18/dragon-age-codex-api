export default function getPrefix(route: string){
    return process.env.API_PREFIX + "/" + route
} 