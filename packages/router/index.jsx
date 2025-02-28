import Menu from "../features/menu/ui";
import Cart from "../features/cart/ui";
import Receipt from "../features/order/ui/indexReceipt";
import OrderDone from "../features/order/ui/indexOrderDone";
import Error from "../error/ui";
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Menu/>,
      errorElement: <Error/>
    },
    {
      path: '/Cart',
      element: <Cart/>
    },
    {
      path: 'orderdone/:orderid/receipt',
      element: <Receipt/>
    },
    {
      path: "orderdone/:orderid",
      element: <OrderDone/>
    }
  ]);

  export default router;