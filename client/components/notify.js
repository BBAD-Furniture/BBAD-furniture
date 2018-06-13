import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = message => {
   toast(message, {
    className: 'toastCss'
  });
};

export default notify;
