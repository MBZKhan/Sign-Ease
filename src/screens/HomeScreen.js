import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isClearButtonClicked, setClearButtonClicked] = useState(false);

    const onTouchEnd = () => {
        paths.push(currentPath);
        setCurrentPath([]);
        setClearButtonClicked(false);
    };

    const onTouchMove = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        if (locationX >= 0 && locationX <= width && locationY >= 0 && locationY <= height * 0.7) {
            const newPath = [...currentPath];
            const newPoint = `${newPath.length === 0 ? 'M' : 'L'}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
            newPath.push(newPoint);
            setCurrentPath(newPath);
        }
    };

    const handleClearButtonClick = () => {
        setPaths([]);
        setCurrentPath([]);
        setClearButtonClicked(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <Svg height={height * 0.7} width={width}>
                    <Path
                        d={paths.join('')}
                        stroke={'black'} 
                        fill={'transparent'}
                        strokeWidth={3}
                        strokeLinejoin={'round'}
                        strokeLinecap={'round'}
                    />
                    {paths.length > 0 &&
                        paths.map((item, index) => (
                            <Path
                                key={`path-${index}`}
                                d={currentPath.join('')}
                                stroke={'black'} 
                                fill={'transparent'}
                                strokeWidth={2}
                                strokeLinejoin={'round'}
                                strokeLinecap={'round'}
                            />
                        ))}
                </Svg>
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
                <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgContainer: {
        height: height * 0.7,
        width: width * 0.9,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        overflow: 'hidden', 
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
