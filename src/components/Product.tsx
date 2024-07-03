import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { cartActions } from "@/components/Store/cart-slice";

// Define the props interface
interface ProductProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  image,
  title,
  price,
  description,
}) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(
      cartActions.addItem({
        id,
        image,
        title,
        description,
        price,
        quantity: 1,
        totalPrice: price,
      })
    );
  };

  return (
    <Card key={id} className="">
      <CardHeader>
        <img src={image} alt={title} />
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <p className="mr-4">{price} $</p>
        <Button onClick={addHandler}>add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
