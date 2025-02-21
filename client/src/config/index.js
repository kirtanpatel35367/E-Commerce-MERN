import { PiListChecksFill } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import menImage from '../assets/menImage.jpg'
import { icons, ShirtIcon } from "lucide-react";

export const registerFormControl = [
    {
        name: 'username',
        label: 'User Name',
        placeholder: 'User name',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Your Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Your Password',
        componentType: 'input',
        type: 'password',
    },

]

export const LoginFormControl = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Your Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Your Password',
        componentType: 'input',
        type: 'password',
    },
]

export const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: MdSpaceDashboard
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: PiListChecksFill
    },
    {
        id: 'product',
        label: 'Product',
        path: '/admin/products',
        icon: FaShoppingCart
    }
];

export const genderwiseProducts = [

    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: ShirtIcon },
    { id: "kids", label: "Kids", icon: ShirtIcon },
    { id: "accessories", label: "Accessories", icon: ShirtIcon },
    { id: "mobiles", label: "Mobiles", icon: ShirtIcon },
    { id: "laptops", label: "Laptops", icon: ShirtIcon },
]


export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        placeholder: "Select Category",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "mobiles", label: "Mobiles" },
            { id: "laptops", label: "Laptops" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        placeholder: "Select Category",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
            {
                id: "samsung", label: "Samsung"
            },
            {
                id: "apple", label: "Apple"
            },
            {
                id: 'asus', label: "ASUS"
            }
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
]

export const shoppingViewHeaderMenuItems = [

    {
        id: 'all',
        label: "All",
        path: '/shop/productList'
    },
    {
        id: 'mobiles',
        label: "mobiles",
        path: '/shop/productList'
    }, {
        id: 'men',
        label: "Men",
        path: '/shop/productList'
    }, {
        id: 'Women',
        label: "Women",
        path: '/shop/productList'
    },
    {
        id: 'kids',
        label: "Kids",
        path: '/shop/productList'
    },
    {
        id: 'about us',
        label: "About us",
        path: '/*'
    },
    {
        id: 'contactus',
        label: "Contact Us",
        path: '/*'
    }
]

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
];

export const CategoryOptionMap = {
    "men": "Men",
    "women": "Women",
    "kids": "Kids",
    "accessories": "Accessories",
    "footwear": "Footware",
    "mobiles": "Mobile",
    "laptops": "Laptops"
}

export const BrandOptionMap = {
    "nike": "Nike",
    "zara": "Zara",
    "h&m": "H&M",
    "samsung": "Samsung",
    "apple": "Apple",
    "asus": "ASUS"
}

export const filterOptions = {
    Category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "mobiles", label: "Mobiles" },
        { id: "laptops", label: "Laptops" },

    ],
    Brand: [
        { id: "nike", label: "Nike" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
        {
            id: "samsung", label: "Samsung"
        },
        {
            id: "apple", label: "Apple"
        },
        {
            id: 'asus', label: "ASUS"
        }
    ],
};