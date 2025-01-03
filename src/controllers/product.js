import { createProduct } from "../models/product.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const create = async (req, res) => {
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
      .json(new ApiResponse(201, productId, "Registration success"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error while registering"));
  }
};

export const viewAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(201).json(new ApiResponse(201, products, "Success!"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching products"));
  }
};

export const viewAvailable = async (req, res) => {
  try {
    const products = await getAvailableProducts();

    res.status(201).json(new ApiResponse(201, products, "success"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching products"));
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const success = await updateProduct(id, updates);
    if (success) {
      res.status(201).json(new ApiResponse(200, success, " success"));
    } else {
      res.status(404).json(new ApiError(404, "Product not found"));
    }
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching products"));
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await removeProduct(id);
    if (success) {
      res.status(201).json(new ApiResponse(201, success, "Product removed"));
    } else {
      res.status(404).json(new ApiError(404, "Product not found"));
    }
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching products"));
  }
};
