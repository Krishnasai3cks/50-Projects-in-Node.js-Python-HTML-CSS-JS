import hashlib


def crack_sha1_hash(hashed, use_salts=False):
    with open('top-10000-passwords.txt', 'r') as g:
        glines = g.read().split('\n')
        for gline in glines:
            if(use_salts):
                with open('known-salts.txt', 'r') as f:
                    lines = f.read().split('\n')
                for line in lines:
                    a = (hashlib.sha1(bytes(line+gline, 'utf-8')).hexdigest())
                    b = (hashlib.sha1(bytes(gline+line, 'utf-8')).hexdigest())
                    if(a == hashed or b == hashed):
                        return str(gline)
            else:
                if((hashlib.sha1(bytes(gline, 'utf-8')).hexdigest()) == hashed):
                    return str(gline)
    return "PASSWORD NOT IN DATABASE"

    # print(hashlib.sha1(bytes(hasher1, 'utf-8')).hexdigest())
    # print(hashlib.sha1(bytes(hasher2, 'utf-8')).hexdigest())


print(crack_sha1_hash("2250b6cf835baa61e4c9b93f3f06831b7ee68fd8", use_salts=False))
