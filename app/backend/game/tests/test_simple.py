# backend/game/tests/test_simple.py
from django.test import TestCase

class SimpleTest(TestCase):
    def test_basic_addition(self):
        self.assertEqual(1 + 1, 2)
