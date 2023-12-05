# def string_to_combined_binary(plaintext):
#     binary_values = ['{0:08b}'.format(ord(char)) for char in plaintext]
#     combined_binary = ','.join(binary_values)
#     return combined_binary

# # Example usage:
# # plaintext = "Ahmad jalal is a good boye"
# plaintext = "Hello World!"
# combined_binary_result = string_to_combined_binary(plaintext)
# print(f"The combined binary values of '{plaintext}' are {combined_binary_result}")


# def string_to_combined_hex(plaintext):
#     binary_values = ['{0:08b}'.format(ord(char)) for char in plaintext]
    
#     # Combine binary values into 64-bit blocks
#     binary_blocks = ["".join(binary_values[i:i+8]) for i in range(0, len(binary_values), 8)]
#     print(binary_blocks)
#     # Pad the last block with zeros if needed
#     last_block = binary_blocks[-1].ljust(64, '0')
#     print(last_block)
#     # Convert each 64-bit block to its 16-bit hexadecimal representation
#     hex_values = [format(int(block, 2), '04X') for block in binary_blocks]
#     print(hex_values)
#     combined_hex = ','.join(hex_values)
#     return combined_hex

# # Example usage:
# plaintext = "Hello World!"
# combined_hex_result = string_to_combined_hex(plaintext)
# print(f"The combined 16-bit hexadecimal values of '{plaintext}' are {combined_hex_result}")



def string_to_combined_hex(plaintext):
    binary_values = ['{0:08b}'.format(ord(char)) for char in plaintext]
    
    # Combine binary values into 64-bit blocks
    binary_blocks = ["".join(binary_values[i:i+8]) for i in range(0, len(binary_values), 8)]
    
    # Pad the last block with zeros if needed
    last_block = binary_blocks[-1].ljust(64, '0')
    
    # Add the padded last block to the binary_blocks list
    binary_blocks[-1] = last_block
    
    # Convert each 64-bit block to its 16-bit hexadecimal representation
    hex_values = [format(int(block, 2), '04X') for block in binary_blocks]
    
    return hex_values

# Example usage:
plaintext = "Hello World!"
combined_hex_results = string_to_combined_hex(plaintext)
print(f"The combined 16-bit hexadecimal values of '{plaintext}' are {combined_hex_results}")
