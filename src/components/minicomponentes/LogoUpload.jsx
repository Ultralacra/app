import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'Subiendo') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} exito al subir la imagen.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} error al subir la imagen.`);
    }
  },
  beforeUpload(file) {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPGorPNG) {
      message.error('Solo se pueden subir imágenes en formato JPG o PNG.');
    }
    const isLessThan1MB = file.size / 1024 / 1024 < 1;
    if (!isLessThan1MB) {
      message.error('La imagen debe ser menor a 1 MB.');
    }
    return isJPGorPNG && isLessThan1MB;
  },
};

const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>click para subir</Button>
  </Upload>
);
export default App;