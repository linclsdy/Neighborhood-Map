const api = "https://api.foursquare.com/v2/venues/search?ll="
const photoapi = "https://api.foursquare.com/v2/venues/VENUE_ID/photos?"
const clientID = 'GPUITHKHY3K10Z3LBXG4LVIFUVW4R20SVNLIU15HNQRT4FYK'
//const clientID = 'G4UE1JIRD3TCVHEYFFG4UKAWUV2PF1XTDKOJF024CDXHBAZ2'
const clientSecret = 'XD43WGAUSHSH1I1PNQ4H1NYF52343YPSV4XUWNJOKQMUJKNG'
//const clientSecret = 'JEOXNYGHY33ILBHXQTPGN10PHEIEKU3BJICTEXJABV25RQSI'
const searchResut = 1
const photoResolution = "200x200"
const headers = {
  'Accept': 'application/json'
}

export async function getFoursquareData(props) {
    const queryURL = api + props.position.lat + ',' + props.position.lng + '&limit=' + searchResut + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20181225';
    try {
        const res = await fetch(queryURL, headers);
        const data = await res.json();
        const photores = await fetch(photoapi.replace("VENUE_ID", data.response.venues[0].id) + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20181225');
        const photodata = await photores.json();
        return {
            name: data.response.venues[0].name,
            address: data.response.venues[0] ? data.response.venues[0].location.formattedAddress: 'Sorry Not Available',
            photoURL: photodata.response.photos.items[0].prefix + photoResolution + photodata.response.photos.items[0].suffix
        }
      } catch (error) {
        console.error(error);
    }
}