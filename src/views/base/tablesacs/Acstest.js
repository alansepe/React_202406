import { useSelector } from 'react-redux';
//import { StringValue} from 'StringValue';

export function Acstest({ stringId }) {
  const acstest = useSelector((state) => state.strings);

  // Note: do your own error handling as required
  return (
    <>
       <StringValue sId="myStringKey" />
    </>
  )




}
export default Acstest;