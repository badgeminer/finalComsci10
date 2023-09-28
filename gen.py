import string
s = ""
for i in str(string.ascii_lowercase)[::-1]:
    s += ("""if (level <= %s) {
    return "%s"
} else """) % (((str(string.ascii_lowercase)[::-1]).rfind(i)*2)+2, i)
print(s)