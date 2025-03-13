from token import create_reset_token, verify_reset_token

test_email = "aryanyogesh1947@gmail.com"

test_token = create_reset_token(test_email)
print("generated token", test_token)

decoded_email = verify_reset_token(test_token)
print("decoded email", decoded_email)