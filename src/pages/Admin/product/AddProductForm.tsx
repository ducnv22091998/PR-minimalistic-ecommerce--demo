import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/productSlice";
import { useHistory } from "react-router-dom";
import { getCategories, selectCategories } from "../../../redux/categorySlice";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type RequiredMark = boolean | "optional";

const AddProductForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyC-6g7NQbxB6ncRrRnQCq-zRyStzjq2p1c",
    authDomain: "cloud-minimalistic-ecomm-5fdda.firebaseapp.com",
    projectId: "cloud-minimalistic-ecomm-5fdda",
    storageBucket: "cloud-minimalistic-ecomm-5fdda.appspot.com",
    messagingSenderId: "804946020776",
    appId: "1:804946020776:web:31346cfe89641d5165759d",
    measurementId: "G-LC81676J49",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const storage = getStorage(firebaseApp);

  // const uploadTask = storage
  //   .ref(`images/${imageProduct[0].originFileObj.name}`)
  //   .put(imageProduct[0].originFileObj);

  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {},
  //   (error) => {
  //     console.log(error);
  //   },
  //   () => {
  //     storage
  //       .ref("images")
  //       .child(files.thumbnail_cdn.originalFilename)
  //       .getDownloadUrl()
  //       .then((url) => console.log(url));
  //   }
  // );

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setImageProduct(e.fileList);
    return e && e.fileList;
  };

  const [nameProduct, setNameProduct] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [ratingProduct, setRatingProduct] = useState("");
  const [quantilyProduct, setQuantilyProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [imageProduct, setImageProduct] = useState<any>();

  const dispatch = useDispatch();
  const history = useHistory();

  const categories = useSelector(selectCategories);

  // useEffect(() => {
  //   if (!categories) {
  //     dispatch(getCategories());
  //   }
  // }, [categories]);

  const handleSubmit = () => {
    dispatch(
      addProduct({
        name: nameProduct,
        category_id: categoryProduct,
        rating: ratingProduct,
        quantily: quantilyProduct,
        price: priceProduct,
        description: descriptionProduct,
        thumbnail_cdn: imageProduct[0].originFileObj,
      })
    );

    // console.log(imageProduct[0].originFileObj);

    // history.push("/admin/product");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkValue: requiredMark }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Name" required>
        <Input
          placeholder="Tên sản phẩm..."
          value={nameProduct}
          onChange={(e) => setNameProduct(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Category"
        rules={[{ required: true, message: "Please select category!" }]}
      >
        <Select
          placeholder="Danh mục sản phẩm..."
          // value={categoryProduct}
          onChange={(e) => setCategoryProduct(e)}
        >
          {categories.map((category) => (
            <Option value={category._id}>{category.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Rating"
        rules={[{ required: true, message: "Please select rating!" }]}
      >
        <Select
          placeholder="Đánh giá sản phẩm..."
          // value={ratingProduct}
          onChange={(e) => setRatingProduct(e)}
        >
          <Option value="5">Rất tốt</Option>
          <Option value="4">Tốt</Option>
          <Option value="3">Bình thường</Option>
          <Option value="2">Tệ</Option>
          <Option value="1">Rất tệ</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Quantily" required>
        <Input
          placeholder="Số lượng..."
          value={quantilyProduct}
          onChange={(e) => setQuantilyProduct(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Price" required>
        <Input
          placeholder="Giá tiền..."
          value={priceProduct}
          onChange={(e) => setPriceProduct(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Description" required>
        <TextArea
          rows={4}
          value={descriptionProduct}
          onChange={(e) => setDescriptionProduct(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra=""
      >
        <Upload name="thumbnail_cdn" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
