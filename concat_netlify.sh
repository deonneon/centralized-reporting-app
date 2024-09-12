#!/bin/bash

# Create or clear the 'parse' file
> parse.txt

echo -e "I am designing a website to centralize the business reporting for a company. It will be a place for managers to go in and find reports. They can also request reports. There should be a data catalog functionality. Design a website like that for me that which bring the most values to the managers and c-suite users.\n\n" > parse.txt

# Loop through all .ts, .tsx, .js, and .css files in current and child directories, excluding node_modules, .netlify, and .next folders, along with specific files
find . -type d \( -path './node_modules' -o -path './.netlify' -o -path './.next' \) -prune -o -type f \( -name "*.js" -o -name "*.css" -o -name "*.tsx" -o -name "*.ts" \) ! -name 'reportWebVitals.js' ! -name 'setupTests.js' ! -name 'App.test.js' ! -name 'tailwind.config.ts' ! -name 'next-env.d.ts' -print0 | while IFS= read -r -d '' file; do
    # Print the title (filename)
    echo "File: $file" >> parse.txt

    # Print the content of the file
    cat "$file" >> parse.txt

    # Print a separator
    echo -e "\n" >> parse.txt
done

echo "Concatenation complete. Output in 'parse.txt'."

# Function to print the directory structure
print_tree() {
    local dir="$1"
    local prefix="$2"
    
    # Loop through all items in the directory
    for item in "$dir"/*; do
        # Skip node_modules, .netlify, and .next directories
        if [[ "$item" == *"/node_modules"* || "$item" == *"/.netlify"* || "$item" == *"/.next"* ]]; then
            continue
        fi

        # Get the relative path
        local relative_path="${item#./}"

        if [ -f "$item" ]; then
            # Print relative file path
            echo "${prefix}${relative_path}" >> parse.txt
        elif [ -d "$item" ]; then
            # Print relative directory path
            echo "${prefix}${relative_path}/" >> parse.txt
            # Recursively call for subdirectories
            print_tree "$item" "  ${prefix}"
        fi
    done
}

echo -e "\nProject Directory Tree:" >> parse.txt
print_tree "." ""

echo "Directory tree added to 'parse.txt'."