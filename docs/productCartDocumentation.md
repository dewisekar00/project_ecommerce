Berikut adalah dokumentasi untuk kode yang diberikan:

---

###[versi bahasa indonesia]

## ProductCart Component

### Overview:
Komponen `ProductCart` adalah komponen React yang bertanggung jawab untuk menampilkan keranjang belanja produk. Komponen ini menggunakan React Hooks seperti `useState` dan `useEffect` untuk mengelola state dan efek samping. Selain itu, komponen ini menggunakan `useSelector` dari `react-redux` untuk mengakses data dari store Redux dan `useNavigate` dari `react-router-dom` untuk navigasi.

### State:
1. `products`: Menyimpan daftar produk yang ada di keranjang belanja dari redux.
2. `counts`: Menyimpan jumlah produk yang dipilih oleh pengguna.
3. `isChecked`: Menyimpan status checked/unchecked untuk setiap produk.
4. `totalPrice`: Menyimpan total harga dari semua produk yang dipilih.
5. `totalItems`: Menyimpan total jumlah item yang dipilih.

### Methods:
1. `handleBack()`: Fungsi untuk kembali ke halaman utama ketika tombol "Back" diklik.
2. `handleCheckboxChange(index)`: Fungsi untuk mengubah status checked/unchecked pada suatu produk.
3. `increment(index)`: Fungsi untuk menambah jumlah produk yang dipilih.
4. `decrement(index)`: Fungsi untuk mengurangi jumlah produk yang dipilih.
5. `updateTotalPrice()`: Fungsi untuk menghitung total harga dan total jumlah item yang dipilih.

### Lifecycle Methods:
1. `useEffect()`: Digunakan untuk memperbarui total harga ketika terjadi perubahan pada `products`, `counts`, atau `isChecked`.

### Render:
Komponen ini merender tampilan keranjang belanja dengan menggunakan produk-produk yang ada dalam state `products`. Jika keranjang belanja kosong, akan ditampilkan pesan "Cart is empty, let's go shopping!". Jika tidak, akan ditampilkan daftar produk beserta jumlah, harga, dan tombol untuk menambah/mengurangi jumlah produk. Selain itu, juga ditampilkan total harga dari semua produk yang dipilih serta tombol untuk checkout.

---



---

###[English version]

## ProductCart Component

### Overview:
The `ProductCart` component is a React component responsible for displaying the product shopping cart. This component utilizes React Hooks such as `useState` and `useEffect` to manage state and side effects. Additionally, it uses `useSelector` from `react-redux` to access data from the Redux store and `useNavigate` from `react-router-dom` for navigation.

### State:
1. `products`: Stores the list of products in the shopping cart from Redux.
2. `counts`: Stores the quantity of products selected by the user.
3. `isChecked`: Stores the status of checked/unchecked for each product.
4. `totalPrice`: Stores the total price of all selected products.
5. `totalItems`: Stores the total number of items selected.

### Methods:
1. `handleBack()`: Function to navigate back to the main page when the "Back" button is clicked.
2. `handleCheckboxChange(index)`: Function to toggle the checked/unchecked status of a product.
3. `increment(index)`: Function to increment the quantity of a selected product.
4. `decrement(index)`: Function to decrement the quantity of a selected product.
5. `updateTotalPrice()`: Function to calculate the total price and total number of selected items.

### Lifecycle Methods:
1. `useEffect()`: Used to update the total price when there are changes in `products`, `counts`, or `isChecked`.

### Render:
This component renders the shopping cart view using the products stored in the `products` state. If the shopping cart is empty, a message "Cart is empty, let's go shopping!" will be displayed. Otherwise, it will display the list of products along with their quantity, price, and buttons to increment/decrement the quantity. Additionally, it will show the total price of all selected products and a checkout button.

---