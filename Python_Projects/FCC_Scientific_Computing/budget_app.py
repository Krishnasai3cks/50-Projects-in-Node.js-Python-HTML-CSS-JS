finalarray = []


class Category:
    def createrepresentation(self):
        a = ''+self.category.center(30, '*')+'\n'
        total = 0
        for i in self.ledger:
            total += i["amount"]
            newtype = "{:.2f}".format(i["amount"])
            a += i["description"][0:23].ljust(23, ' ') + \
                str(newtype)[0:7].rjust(7, ' ')+'\n'
        a += "Total: "+str(total)
        return a

    def __str__(self):
        return self.createrepresentation()

    def __unicode__(self):
        return u'' + self.createrepresentation()+''

    def __repr__(self):
        return self.createrepresentation()

    def __init__(self, category):
        self.category = category
        self.ledger = []

    def get_balance(self):
        balance = 0
        for i in self.ledger:
            balance += i["amount"]
        return balance

    def deposit(self, amount, description=''):
        return self.ledger.append(
            {
                "amount": amount,
                "description": description
            })

    def withdraw(self, amount, description=''):

        if(not self.check_funds(amount)):
            return False
        else:
            finalarray.append([self.category, amount])
            self.ledger.append({
                "amount": (amount * -1),
                "description": description
            })
            return True

    def transfer(self, newamount, newobject):

        if (self.check_funds(newamount)):
            finalarray.append([self.category, newamount])
            self.ledger.append({
                "amount": (newamount) * -1,
                "description": "Transfer to "+newobject.category
            })
            newobject.ledger.append({
                "amount": newamount,
                "description": "Transfer from "+self.category
            })
            return True
        else:
            return False

    def check_funds(self, amounttocheck):
        amount_left = self.get_balance()
        if(amounttocheck > amount_left):
            return False
        else:
            return True


# object instantiations
foodobj = Category("Food")
entobj = Category("Entertainment")
business = Category("Business")
# end
foodobj.deposit(900, "deposit")
entobj.deposit(900, "deposit")
business.deposit(900, "deposit")
foodobj.withdraw(105.55)
entobj.withdraw(33.40)
entobj.withdraw(55)
business.withdraw(10.99)
print(foodobj)
print(entobj)
print(business)
# For food
# foodobj.deposit(10, "deposit")
# foodobj.withdraw(5, "first withdrawl")
# foodobj.transfer(5, clothobj)
# # For clothing
# clothobj.deposit(45)
# clothobj.withdraw(5, "second withdrawl")


# # for entertainment
# entobj.deposit(99)
# entobj.withdraw(7, "third withdrawl")


def create_spend_chart(categories):
    changedlist = []
    for i in categories:
        changedlist.append(''.join(str(i).split('\n')[0].split('*')))
    categories = changedlist
    print(categories)
    sarray = []
    withdrawlist = []
    for i in finalarray:
        if(i[0] not in sarray):
            sarray.append(i[0])
            withdrawlist.append(i[1])
        else:
            withdrawlist[sarray.index(i[0])] += i[1]

    sPerList = [(a*100)/sum(withdrawlist) for a in withdrawlist]
    array = []
    Percentagelist = []
    for i in categories:
        if(i in sarray):
            array.append(i)
            Percentagelist.append(sPerList[sarray.index(i)])
    a = 'Percentage spent by category\n'
    for i in [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]:
        # print(str(i).rjust(3),end = '')
        # print('|')
        a += str(i).rjust(3)+'|'
        for j in Percentagelist:
            a += ' o ' if j > i else '   '
        a += '\n'
    a += '    ----------\n'

    newarr = [len(k) for k in array]
    for i in range(max(newarr)):
        a += '     '
        for j in range(len(array)):
            try:
                a += array[j][i]+'  '
            except:
                a += '   '
        if(i != max(newarr) - 1):
            a += '\n'
        else:
            a += '  '
    return a


print(create_spend_chart(['Business', 'Food', 'Entertainment']))
# class Food(Category):
#     def __init__(self, amount, description=''):
#         self.amount = amount
#         self.description = description
#         self.category = 'food'
#         self.ledger = []


# class Clothing(Category):
#     def __init__(self, amount, description=''):
#         self.amount = amount
#         self.description = description
#         self.category = 'clothing'
#         self.ledger = []


# class Entertainment(Category):
#     def __init__(self, amount, description=''):
#         self.amount = amount
#         self.description = description
#         self.category = 'entertainment'
#         self.ledger = []
