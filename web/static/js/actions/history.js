export function Navigate(url){
  return {
    type: "HISTORY_NAVIGATE",
    url: url
  }
}