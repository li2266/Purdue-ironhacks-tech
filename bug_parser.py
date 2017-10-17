# parser the result of bug detection

import csv
import os
import json


projects_path = '../ironhacks-tech-judge/repository_purdue_p4'
library_list = list()
error_record = {}
line_record = {}
output_file_name = 'bug_detection_result.csv'

def get_library():
	with open("library.csv") as library_file:
		library_reader =csv.reader(library_file)
		for library in library_reader:
			library_list.append(library[0])

def parse_bug_detection_result():
	for parent, dirs, files in os.walk("bug_detection_result"):
		for file in files:
			path = os.path.join(parent, file)
			with open(path, 'rt') as file_content:
				#print(file)
				dic = json.load(file_content)
				error = 0;
				# for JS

				for errors in  dic['js']['errors']:
					for lib in library_list:
						if errors.lower().find(lib) != -1:
							error -= 1;
							break;
					error += 1
				for errors in dic['js']['resourceErrors']:
					for lib in library_list:
						if errors.lower().find(lib) != -1:
							error -= 1
							break;
					error += 1
				# for CSS
				if 'errors' in dic['css']:
					for errors in dic['css']['errors']:
						for lib in library_list:
							if errors['uri'].lower().find(lib) != -1:
								error -= 1
								break;
						error += 1

				# for HTML
				for errors in dic['html']:
					for lib in library_list:
						if errors.lower().find(lib) != -1:
							error -= 1
							break
					error += 1
				username = file.split('!')[4].split('-')[-1]
				if username not in error_record:
					error_record[username] = 0
				error_record[username] += error
	print(error_record)

def count_line_of_project():
	os.chdir(projects_path)
	cur_dir = os.getcwd()
	for key in error_record:
		os.chdir(os.path.join(cur_dir, "2017-Purdue-IronHack-" + key))
		# for individuals 
		print(key)
		line_record[key] = 0
		for parent, dirs, files in os.walk("."):
			for file in files:
				if file.split('.')[-1] != 'html' and file.split('.')[-1] != 'css' and file.split('.')[-1] != 'js':
					continue
				path = os.path.join(parent, file)
				flag_lib = 0
				for lib in library_list:
					if file.find(lib) != -1:
						flag_lib = 1
						break
				if flag_lib == 1:
					continue
				try:
					length = len(open(path).readlines())
					line_record[key] += length
					print("{} {}".format(path, length))
				except Exception as e:
					print(e)
	os.chdir(cur_dir)
	os.chdir('..')
	print(line_record)
	print(os.getcwd())

def fun():
	res = list()
	for key in line_record:
		row = list()
		row.append(key)
		row.append(error_record[key] / line_record[key])
		res.append(row)
		print("{} {}".format(key, error_record[key] / line_record[key]))
	with open(output_file_name, "w") as f:
		writer = csv.writer(f)
		writer.writerows(res)

if __name__ == '__main__':
	get_library()
	parse_bug_detection_result()
	count_line_of_project()
	fun()