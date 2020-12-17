class Rectangle:
    def __str__(self):
        return 'Rectangle(width={}, height={})'.format(self.width, self.height)

    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return (2 * self.width + 2 * self.height)

    def get_diagonal(self):
        return ((self.width ** 2 + self.height ** 2) ** .5)

    def get_picture(self):
        a = ''
        if(self.width > 50 or self.height > 50):
            return 'Too big for picture.'
        for i in range(self.height):
            a += '*'*self.width+'\n'
        return a

    def get_amount_inside(self, shape):
        self_area = self.get_area()
        shape_area = shape.width * shape.height
        return int(self_area/shape_area)


class Square(Rectangle):
    def __init__(self, side):
        self.width = side
        self.height = side

    def __str__(self):
        return 'Square(side={})'.format(self.width)

    def set_side(self, side):
        self.width = side
        self.height = side


b = Rectangle(1, 5)
a = Square(5)
print(a.get_picture())
amount_inside = a.get_amount_inside(b)
amount_inside = int(amount_inside) if '.0' in str(
    amount_inside) else amount_inside
print(amount_inside)
print(b)
print(a)
