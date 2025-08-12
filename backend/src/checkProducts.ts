import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProducts() {
    try {
        const productCount = await prisma.product.count();
        console.log(`Total products in database: ${productCount}`);

        const sampleProducts = await prisma.product.findMany({
            take: 5,
            select: {
                id: true,
                sku: true,
                barcode: true,
                name: true,
                category: true,
                listPrice: true,
                stockQuantity: true
            }
        });

        console.log('\nSample products:');
        sampleProducts.forEach(product => {
            console.log(`- ${product.name} (SKU: ${product.sku}, Barcode: ${product.barcode}, Price: $${product.listPrice})`);
        });

    } catch (error) {
        console.error('Error checking products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkProducts();
