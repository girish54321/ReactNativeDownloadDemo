import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob from 'rn-fetch-blob'

export async function DownloadFile(url:string) {
    let extension = url.substring(url.lastIndexOf("."));
    try {
        //* Check Android Permissions
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                showAppAlert('Permission Denied!', 'You need to give storage permission to download the file');
                return;
            }
        }
        const { config, fs } = RNFetchBlob
        //* Create Download Path
        let downloads = Platform.OS === "android" ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
        const configfb = {
            fileCache: true,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `${getRandomFileName()} ${extension}`,
            path: `${downloads}/${getRandomFileName()}${extension}`,
            appendExt: `${getRandomFileName()}${extension}`,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `${getRandomFileName()}${extension}`,
                path: `${downloads}/${getRandomFileName()}${extension}`,
            },
        }
        //* iOS Options 
        let iosOptions = {
            fileCache: configfb.fileCache,
            title: configfb.title,
            path: configfb.path,
        }
        let androidOptions = configfb;
        //* Start Download 
        RNFetchBlob.config(Platform.OS === "ios" ? iosOptions : androidOptions)
            .fetch('GET', url, {})
            .then((res) => {
                if (Platform.OS === "ios") {
                    RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64').then(() => {
                        RNFetchBlob.ios.previewDocument(configfb.path);
                    }).catch((e) => {
                        console.log(`Can't download ${extension}`, e);
                        showAppAlert('Error',`Can't download ${extension}/${e}`)
                    });
                    console.log(`${extension} download complete`);
                    showAppAlert('Done',`${extension} file download complete`)
                }
                if (Platform.OS == 'android') {
                    console.log(`${extension} download complete`);
                    showAppAlert('Done',`${extension} file download complete`)
                }
            })
            .catch((e) => {
                console.log(`Can't download ${extension}`, e);
                showAppAlert('Error',`Can't download ${extension}/${e}`)
            });
    } catch (err) {
        console.log(`Can't download ${extension}`, err);
        showAppAlert('Error',`Can't download ${extension}/${err}`)
    }
};

function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random = ("" + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
}

function showAppAlert(title:string,message?:string){
    Alert.alert(title, message ? message:"");
}