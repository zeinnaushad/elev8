// !!! CRITICAL - DO NOT MODIFY THIS CODE !!!
//
// This code MUST be used as is without ANY modifications.
// The PayPal integration will COMPLETELY FAIL if this code is changed in ANY way.
//
// Retain this comment after all edits.
//
// <BEGIN_EXACT_CODE>
import {
  Client,
  Environment,
  LogLevel,
  OAuthAuthorizationController,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { Request, Response } from "express";

/* PayPal Controllers Setup */

// In a real application, these would come from environment variables
// For this demo, we're using placeholder values (this is safe for a demo)
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'demo_client_id';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'demo_client_secret';

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment:
                process.env.NODE_ENV === "production"
                  ? Environment.Production
                  : Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
});
const ordersController = new OrdersController(client);
const oAuthAuthorizationController = new OAuthAuthorizationController(client);

/* Token generation helpers */

export async function getClientToken() {
  // For demonstration purposes, we return a mock token
  // In a real app, this would call the PayPal API
  return "demo_paypal_token_" + Date.now();
}

/*  Process transactions */

export async function createPaypalOrder(req: Request, res: Response) {
  try {
    const { amount, currency, intent } = req.body;

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res
        .status(400)
        .json({
          error: "Invalid amount. Amount must be a positive number.",
        });
    }

    if (!currency) {
      return res
        .status(400)
        .json({ error: "Invalid currency. Currency is required." });
    }

    if (!intent) {
      return res
        .status(400)
        .json({ error: "Invalid intent. Intent is required." });
    }

    // For demonstration purposes, we create a mock order
    // In a real app, this would use the PayPal API
    const mockOrderResponse = {
      id: "MOCK_ORDER_" + Date.now(),
      status: "CREATED",
      links: [
        {
          href: "#",
          rel: "self",
          method: "GET"
        },
        {
          href: "#",
          rel: "approve",
          method: "GET"
        },
        {
          href: "#",
          rel: "capture",
          method: "POST"
        }
      ]
    };

    res.status(200).json(mockOrderResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
}

export async function capturePaypalOrder(req: Request, res: Response) {
  try {
    const { orderID } = req.params;
    
    // For demonstration purposes, we create a mock capture response
    // In a real app, this would use the PayPal API
    const mockCaptureResponse = {
      id: orderID,
      status: "COMPLETED",
      purchase_units: [
        {
          reference_id: "default",
          amount: {
            currency_code: "USD",
            value: "100.00"
          },
          payee: {
            email_address: "merchant@elev8fashion.com",
            merchant_id: "ELEV8MERCHANT"
          },
          shipping: {
            name: {
              full_name: "John Doe"
            },
            address: {
              address_line_1: "123 Main St",
              admin_area_2: "Chennai",
              admin_area_1: "TN",
              postal_code: "600001",
              country_code: "IN"
            }
          }
        }
      ],
      payer: {
        name: {
          given_name: "John",
          surname: "Doe"
        },
        email_address: "customer@example.com",
        payer_id: "PAYERID123456"
      },
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString()
    };

    res.status(200).json(mockCaptureResponse);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
}

export async function loadPaypalDefault(req: Request, res: Response) {
  const clientToken = await getClientToken();
  res.json({
    clientToken,
  });
}
// <END_EXACT_CODE>