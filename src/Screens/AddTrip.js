import React, {useState, useRef, useContext} from 'react';
import {
  ScrollView,
  Text,
  VStack,
  FormControl,
  Input,
  WarningOutlineIcon,
  Select,
  CheckIcon,
  Slider,
  HStack,
  Button,
  Toast,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomBarHeader from '../Components/BottomBarHeader';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import {AllCity, height} from '../Utils/Constant';
import moment from 'moment';
import {
  getFirestore,
  FieldValue,
  deleteField,
} from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fonts} from '../Config/Fonts';
import { ThemeContext } from '../Context/ThemeContext';
import { getAsyncStorageData } from '../Config/AsyncStorage';
import CustomToast from '../Components/Toast';
import { NavigationContainer } from '@react-navigation/native';
export default function AddTrip({navigation}) {
  const db=getFirestore()
  const inputRef = useRef(null);
  const {isDarkMode} = useContext(ThemeContext);
  const colors = isDarkMode ? darkMode: lightMode;
  const [place,setPlace]=useState('')
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [night, setNight] = useState('');
  const [peoples, setPeoples] = useState('')
  const [budget, setBudget] = useState('0')
  const [dpShow, setDpShow] = useState(false);
  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDpShow(!dpShow);
    setLeaveDate(currentDate);
    inputRef.current.blur();
  };
 const addTrip=async()=>{
  const userId = await getAsyncStorageData('userId');
    const userRef = db.collection('users').doc(userId);
    const tripRef = await userRef.collection('trips').add({
      place:place,
      leaveDate:leaveDate,
      night:night,
      peoples:peoples,
      budget:budget
    });
     Toast.show({
       duration: 2000,
       position: 'bottom',
       render: () => <CustomToast message="Added Succesfully" />,
     });
     navigation.navigate("MyTrip")
 }
  return (
    <ScrollView w={'full'} h={'full'} bg={colors.MAIN_BACKGROUND}>
      <BottomBarHeader headingText={'Plan your trip'} />
      <VStack h={height - height / 4.5} p={4}>
        <FormControl maxW="400px">
          <FormControl.Label>Select State</FormControl.Label>
          <Select
            px={4}
            minWidth="200"
            accessibilityLabel="Choose City"
            placeholder="Choose State"
            value={place}
            onValueChange={setPlace}
            dropdownIcon={
              <AntDesign
                name="down"
                padding={4}
                marginRight={8}
                color={colors.PRIMARY}
                size={14}
              />
            }
            color={colors.TEXT}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={2} />,
            }}
            fontSize={'sm'}
            mt="1">
            {AllCity.map((item, index) => (
              <Select.Item label={item} key={index} value={item} />
            ))}
          </Select>
        </FormControl>
        <FormControl my={1} maxW="400px">
          <FormControl.Label>When you will leave</FormControl.Label>
          <Input
            onFocus={() => setDpShow(true)}
            placeholder="Select date"
            _focus={{borderColor: colors.PRIMARY, borderWidth: 1}}
            ref={inputRef}
            color={colors.TEXT}
            value={moment(leaveDate).format('DD/MM/YY')}
          />
        </FormControl>
        {dpShow && (
          <DateTimePicker
            value={leaveDate}
            mode={'date'}
            display="default"
            onChange={handleDate}
          />
        )}
        <FormControl my={1} maxW="400px">
          <FormControl.Label>Number of nights</FormControl.Label>
          <Input
            _focus={{borderColor: colors.PRIMARY, borderWidth: 1}}
            placeholder="Number of Nights"
            keyboardType="number-pad"
            value={night}
            color={colors.TEXT}
            onChangeText={setNight}
          />
        </FormControl>
        <FormControl my={1} maxW="400px">
          <FormControl.Label>Number of peoples</FormControl.Label>
          <Input
            _input={{borderColor: colors.LIGHT_PRIMARY, borderWidth: 1}}
            _focus={{borderColor: colors.PRIMARY, borderWidth: 1}}
            placeholder="Number of peoples"
            keyboardType="number-pad"
            value={peoples}
            onChangeText={setPeoples}
            color={colors.TEXT}
          />
        </FormControl>
        <FormControl my={1} maxW="400px">
          <FormControl.Label>Budget range</FormControl.Label>
          <HStack space={2}>
            <Slider
              w="3/4"
              maxW="300"
              minValue={0}
              maxValue={100}
              value={budget}
              onChangeEnd={v => {
                v && setBudget(Math.floor(v));
              }}
              accessibilityLabel="hello world">
              <Slider.Track>
                <Slider.FilledTrack bg={colors.PRIMARY} />
              </Slider.Track>
              <Slider.Thumb bg={colors.PRIMARY} />
            </Slider>
            <Text fontFamily={fonts.Inter_Medium} color={colors.TEXT}>
              {'   '}
              <FontAwesome name="rupee" size={16} color={colors.TEXT} /> {''}
              {budget !== 100 ? budget + 'k' : budget + 'k+'}
            </Text>
          </HStack>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          onPress={addTrip}
          _pressed={{
            bg: colors.APP_PRIMARY_LIGHT,
          }}
          marginTop={'auto'}
          _android={{
            bg: colors.PRIMARY,
            _text: {
              color: colors.WHITE,
              fontFamily: fonts.Inter_SemiBold,
            },
          }}>
          Start Planning
        </Button>
      </VStack>
    </ScrollView>
  );
}
