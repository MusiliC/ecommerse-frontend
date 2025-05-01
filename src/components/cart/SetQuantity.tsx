import { Button } from "../ui/button";

type setQuantityProps = {
  quantity: number;
  cardCounter: boolean;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
};

function SetQuantity({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}: setQuantityProps) {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">Quantity</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
        <Button
          variant={"outline"}
          disabled={quantity <= 1}
          onClick={handleQtyDecrease}
        >
          {" "}
          -{" "}
        </Button>
        <div>{quantity}</div>
        <Button variant={"outline"} onClick={handleQtyIncrease}>
          {" "}
          +{" "}
        </Button>
      </div>
    </div>
  );
}

export default SetQuantity;
