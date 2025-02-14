import { PiListChecksFill } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

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
        placeholder:"Select Category",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        placeholder:"Select Category",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
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