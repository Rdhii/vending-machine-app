# 🤖 Vending Machine App

Aplikasi vending machine dengan Next.js 15, TypeScript, Prisma ORM, dan PostgreSQL.

**Fitur:** Customer interface untuk beli produk, Admin panel untuk CRUD produk, History transaksi.

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Rdhii/vending-machine-app.git
cd vending-machine-app
npm install
```

### 2. Setup Database

Buat file `.env` dan tambahkan connection string PostgreSQL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

**Database gratis:** [console.prisma.io](https://console.prisma.io)

### 3. Setup Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migrasi (membuat tabel Product & Transaction)
npx prisma migrate dev --name init
```

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Buka `http://localhost:3000`

## 📡 API Endpoints

**Products:**

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `PATCH /api/products/[id]` - Partial update
- `DELETE /api/products/[id]` - Delete product

**Transactions:**

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction

## 🗄️ Database Schema

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  stock       Int      @default(0)
  imageUrl    String
  transactions Transaction[]
}

model Transaction {
  id          Int      @id @default(autoincrement())
  productId   Int
  totalPrice  Float
  cash        Float
  change      Float
  createdAt   DateTime @default(now())
  product     Product  @relation(fields: [productId], references: [id])
}
```

## 🛠️ Tools

```bash
# Prisma Studio (Database GUI)
npx prisma studio

# Build production
npm run build
npm start
```

## 📱 Pages

- `/` - Vending machine (customer)
- `/admin` - Product management
- `/history` - Transaction history

## 🔧 Tech Stack

Next.js 15 • TypeScript • Prisma • PostgreSQL • Tailwind CSS • React Hook Form • Yup • React Toastify • Axios
