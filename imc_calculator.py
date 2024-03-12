import math

def calculate_imc(weight, height):
  """Calculates the BMI given the weight and height in kilograms and meters."""
  bmi = weight / (height ** 2)
  return bmi
