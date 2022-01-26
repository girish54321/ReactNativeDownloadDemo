import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar
} from 'react-native';
import { DownloadFile } from '../DownloadFileServices';
import { Appbar } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';

const fileArray = [
    {
        title: "PDF",
        image: require('../src/assets/images/pdf.png'),
        url: "http://www.africau.edu/images/default/sample.pdf"
    },
    {
        title: "PNG",
        image: require('../src/assets/images/png.png'),
        url: "https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_1MB.png"
    },
    {
        title: "ZIP",
        image: require('../src/assets/images/zip.png'),
        url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-large-zip-file.zip"
    },
    {
        title: "JPG",
        image: require('../src/assets/images/jpg.png'),
        url: "https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_1MB.jpg"
    },
    {
        title: "DOC",
        image: require('../src/assets/images/doc.png'),
        url: "https://file-examples-com.github.io/uploads/2017/02/file-sample_1MB.doc"
    }
]

export const App = () => {

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 0.5, padding: 22, }} >
                <StatusBar backgroundColor={DefaultTheme.colors.primary} />
                <TouchableOpacity onPress={() => {
                    DownloadFile(item.url);
                }} >
                    <Image source={item.image} style={{ height: 160, width: 160, padding: 22 }} />
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', marginTop: 16, fontSize: 22 }}>{item.title}</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, }}>
            <Appbar.Header>
                <Appbar.Content title="Download Demo" subtitle="Demo App" />
            </Appbar.Header>
            <FlatList
                data={fileArray}
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
};
