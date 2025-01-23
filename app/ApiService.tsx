import axios from 'axios';
const BASE_URL = 'http://64.227.171.118:3100';
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzZmYzBiNDM2YjQ1ZWM0OWMxNDFlNTciLCJpYXQiOjE3MzYxNDY4MzEsImV4cCI6MTczODczODgzMX0.SC95ex734s7qbdly8cMt-ooP-YhWbpJZiVYrhKNfyHs';

export const fetchGetAllProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/products?search=`);
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const LandingPageAllPopular = async() =>{
    try {
        const response = await axios.get(`${BASE_URL}/api/landing-page`);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchGetAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};


export const fetchGetDetailsPRoducts = async (id: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};


export const CartSave = async (id: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const AddressSaveAPINew = async (el: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/address`, {
            "fullName": el.fullName,
            "mobileNo": el.mobileNo,
            "houseNo": el.houseNo,
            "addressLine": el.addressLine,
            "area": el.area,
            "landmark": "",
            "pincode": el.pincode,
            "city": el.city,
            "state": el.state
        }, {
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        }
        );
    } catch (error) {
        console.log('Error fetching products:', error);
    }
};

export const GetAllAddress = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/address`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};



export const PersonalAddressUpdate = async (el:any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/address/${el._id}`, {
            "fullName": el.fullName,
            "mobileNo": el.mobileNo,
            "houseNo": el.houseNo,
            "addressLine": el.addressLine,
            "area": el.area,
            "landmark": "",
            "pincode": el.pincode,
            "city": el.city,
            "state": el.state
        }, {
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
    }
};

export const DeletesAddress = async (id: any) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/address/${id}`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const AllGetCart = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/cart`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const BuinessAPIAddresssUpdate = async (el:any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/address/business/`, {
                "bussinessTitle": el.bussinessTitle,
                "GSTNumber": el.GSTNumber,
                "mobileNo" : el.mobileNo,
                "houseNo": el.houseNo,
                "addressLine": el.addressLine,
                "area": el.area,
                "landmark": "",
                "pincode": el.pincode,
                "city": el.city,
                "state": el.state
            
        }, {
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
    }
};

export const WishlistAdd = async (id:any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/wishlist`,{
            "productId":id
        },{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};


export const GetWishlistAdd = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/wishlist`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const WishlistDelete = async (Id:any) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/wishlist/${Id}`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const CartAddincrese = async (Id:string) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/cart/add`,{
             "productId": Id
        },{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error
    }
    
};

export const CartRemoveDelete = async (Id:string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/cart/${Id}`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
    }
    
};

export const DefaultAddressSet = async (Id:any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/address/${Id}/make-default`,{
            'headers': {
                'Authorization': `Bearer ${Token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
    } 
};