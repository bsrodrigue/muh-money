import {useState, useEffect} from 'react';
import { View, Text } from 'react-native'

interface CreateCategoryFormProps {

}

export default function CreateCategoryForm({}: CreateCategoryFormProps) { 
  const [_state, _setState] = useState(null); // Replace by your state...

  useEffect(()=>{
      // Write your code here...
  },[]);


  return (
    <View><Text>CreateCategoryForm</Text></View>
  );
}
