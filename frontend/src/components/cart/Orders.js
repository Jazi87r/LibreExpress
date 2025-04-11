import React from 'react';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import '../../styles/Orders.css'; // Importar el archivo CSS

const Orders = ({ orders }) => {
    // Función para descargar reporte en formato Excel
    const downloadOrdersReport = () => {
        if (orders.length === 0) {
            alert("No hay órdenes para descargar.");
            return;
        }

        // Crear un arreglo de datos para el reporte
        const reportData = [];

        // Agregar encabezados como la primera fila
        reportData.push(['Orden ID', 'Usuario ID', 'Nombre Usuario', 'Fecha', 'Total', 'Producto', 'Precio', 'Cantidad']);

        // Agregar datos de las órdenes y los productos
        orders.forEach(order => {
            order.items.forEach(item => {
                reportData.push([
                    order._id,
                    order.userId,
                    order.userName,
                    dayjs(order.orderDate).format('DD/MM/YYYY HH:mm'), // Formatear la fecha
                    order.totalPrice,
                    item.name,
                    item.price,
                    item.quantity
                ]);
            });
        });

        // Crear un libro de Excel
        const worksheet = XLSX.utils.aoa_to_sheet(reportData); // Convertir datos a hoja de Excel
        const workbook = XLSX.utils.book_new(); // Crear libro nuevo
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Órdenes'); // Agregar la hoja al libro

        // Generar el archivo Excel
        XLSX.writeFile(workbook, 'reporte_ordenes.xlsx'); // Nombre del archivo
    };

    return (
        <div className="orders-container">
            <h1>Órdenes</h1>
            <button onClick={downloadOrdersReport} className="download-button">
                Descargar Reporte (Excel)
            </button>
            {orders.length === 0 ? (
                <p className="no-orders-message">No hay órdenes disponibles.</p>
            ) : (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order._id}>
                            <h2>Orden ID: {order._id}</h2>
                            <p><strong>Usuario ID:</strong> {order.userId}</p>
                            <p><strong>Nombre de Usuario:</strong> {order.userName}</p>
                            <p><strong>Total de la compra:</strong> ${order.totalPrice}</p>
                            <p><strong>Fecha:</strong> {dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}</p>
                            <h3>Productos:</h3>
                            <ul className="product-list">
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - ${item.price} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;
