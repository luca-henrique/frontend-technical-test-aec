import { ProductType } from "@/types/Product";
import "./style.css";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addProductCart } from "@/store/reducer/cart/actions";

interface ProductDetailProps {
  product: ProductType;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const { id, title, price, description, images, category } = product;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const dispatch = useAppDispatch();
  const addItemProductCart = () => {
    dispatch(addProductCart(product));
  };

  return (
    <div className="bg-black text-white container-detail">
      <div className="p-6 flex flex-row">
        <div className="flex-1">
          <h2 className="text-[20px] font-bold mb-6 ">{title}</h2>
          <button className="rounded-full bg-gray-200 text-gray-700 border-1 border-gray-400 px-4 py-1">
            {category.name}
          </button>
        </div>
        <button
          className="h-fit rounded-full bg-gray-200 text-gray-700 border-1 border-gray-400 px-4 py-2"
          onClick={onClose}
        >
          Back
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 px-6 pb-6 sm:px-20 sm:pb-20 items-start">
        <div className="flex flex-row flex-1 w-max gap-4 self-center sm:self-auto">
          <div className="flex flex-row gap-4">
            <ul className="flex flex-col gap-4">
              {images.map((image, index) => (
                <li key={index}>
                  <img
                    onClick={() => handleThumbnailClick(image)}
                    className={`rounded-md flex-1 cursor-pointer max-w-10 ${
                      selectedImage === image
                        ? "border border-gray-500 opacity-50"
                        : ""
                    }`}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </li>
              ))}
            </ul>

            <img
              src={selectedImage}
              alt="list-image"
              className="w-auto flex-1 max-w-[180px] sm:max-w-[300px] rounded-md self-start"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-betwee h-max items-stretch">
          <p className="mb-6 text-sm sm:text-base">Descrição: {description}</p>
          <div className="flex n items-end justify-between">
            <div>
              <p className="">Preço</p>
              <p className="text-xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(price)}
              </p>
            </div>

            <button
              className="bg-purple-700 px-3 py-1 rounded-md"
              onClick={() => addItemProductCart()}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
