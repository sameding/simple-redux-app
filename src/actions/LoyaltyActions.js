import  {  FECTH_LOYALTY, FECTH_PRODUCT, REDEEM_PRODUCT } from './types';

export const fetchLoyalty = (username) => ({
    type: FECTH_LOYALTY,
    username
});

export const fetchProduct = () => ({
    type: FECTH_PRODUCT
});

export const redeemProduct = (userPoints, productValue) => ({
    type: REDEEM_PRODUCT,
    userPoints,
    productValue
})