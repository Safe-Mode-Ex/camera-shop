import type {MouseEvent, MouseEventHandler} from 'react';
import {useMutation} from '@tanstack/react-query';
import {clearCartMutation} from '@/entities/cart-items';
import {useClearCoupon, useCoupon} from '@/entities/coupons';
import {createOrderMutation} from '@/entities/orders';
import {useCartItems} from '../use-cart-items/use-cart-items';

export const useOrder = (clearCouponValue: () => void): {
  isOrderCreated: boolean,
  handleOrderCreate: MouseEventHandler<HTMLButtonElement>,
  handleModalClose: () => void,
  isPending: boolean,
} => {
  const clearCoupon = useClearCoupon();
  const {mutate: clearCart} = useMutation(clearCartMutation);
  const {mutate: createOrder, isSuccess, isPending, reset} = useMutation({
    ...createOrderMutation,
    onSuccess: () => {
      clearCart();
      clearCoupon();
      clearCouponValue();
    },
  });
  const {data: cartItems} = useCartItems();
  const {data: coupon} = useCoupon();

  const handleOrderCreate = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const camerasIds = cartItems.map(({product}) => product.id);
    const order = {
      camerasIds,
      coupon: coupon ?? null,
    };

    createOrder(order);
  };

  const handleModalClose = () => {
    reset();
  };

  return {
    isOrderCreated: isSuccess,
    handleOrderCreate,
    handleModalClose,
    isPending,
  };
};
