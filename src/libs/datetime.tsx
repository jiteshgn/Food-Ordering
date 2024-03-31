export function dbTimeForHuman(str:any){
    return str.replace('T',' ').substring(0,16);
}