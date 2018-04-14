import unittest


class SmokeTest(unittest.TestCase):

    def test_smoke(self):
        print("I am certainly a test")
        self.assertTrue(True)
