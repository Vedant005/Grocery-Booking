import { createProduct } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res) => {
  const { name, price, description, availability, ratings } = req.body;

  try {
    const productId = await createProduct({
      name,
      price,
      description,
      availability: availability || true,
      ratings: ratings || 0,
    });

    res
      .status(201)
      .json(new ApiResponse(200, productId, "Registration success"));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

export const viewAll = asyncHandler(async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(201).json(new ApiResponse(200, products, " success"));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

export const viewAvailable = asyncHandler(async (req, res) => {
  try {
    const products = await getAvailableProducts();

    res.status(201).json(new ApiResponse(200, products, "success"));
  } catch (error) {
    res.status(500).json({
      message: "Error fetching available products",
      error: error.message,
    });
  }
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const success = await updateProduct(id, updates);
    if (success) {
      res.status(201).json(new ApiResponse(200, success, " success"));
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const success = await removeProduct(id);
    if (success) {
      res
        .status(201)
        .json(new ApiResponse(200, success, "Registration success"));
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product", error: error.message });
  }
});
