set(CMAKE_WARN_DEPRECATED OFF CACHE BOOL "" FORCE)
cmake_minimum_required(VERSION 3.50)
project(ChatroomProj LANGUAGES C CXX)

include(FetchContent)

set(CMAKE_COMPILE_WARNING_AS_ERROR TRUE)

# Generate compile_commands.json
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Our Project
add_executable(${PROJECT_NAME})
add_subdirectory(src/)

# C++ standard
set_target_properties(${PROJECT_NAME} PROPERTIES
    CXX_STANDARD 23
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
)

# Compiler warnings for best practices
if(MSVC)
    target_compile_options(${PROJECT_NAME} PRIVATE /W4 /WX)
else()
    target_compile_options(${PROJECT_NAME} PRIVATE
        -Wall
        -Wextra
        -Wpedantic
        -Werror
    )
endif()


set_target_properties(${PROJECT_NAME} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin/${PROJECT_NAME}
    LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib
    ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

set_property(TARGET ${PROJECT_NAME} PROPERTY VS_DEBUGGER_WORKING_DIRECTORY $<TARGET_FILE_DIR:${PROJECT_NAME}>)


# set(RESOURCES_PATH ${CMAKE_SOURCE_DIR}/src/resources)
# add_custom_command(
#         TARGET ${PROJECT_NAME} POST_BUILD
#         COMMAND ${CMAKE_COMMAND} -E copy_directory ${RESOURCES_PATH} $<TARGET_FILE_DIR:${PROJECT_NAME}>/resources
#     )

# add_custom_command(
#         TARGET ${PROJECT_NAME} POST_BUILD
#         COMMAND ${CMAKE_COMMAND} -E copy_directory
#         ${CMAKE_CURRENT_SOURCE_DIR}/src/resources
#         ${CMAKE_CURRENT_BINARY_DIR}/resources)


# Checks if OSX and links appropriate frameworks (Only required on MacOS)
if (APPLE)
    target_link_libraries(${PROJECT_NAME} "-framework IOKit")
    target_link_libraries(${PROJECT_NAME} "-framework Cocoa")
    target_link_libraries(${PROJECT_NAME} "-framework OpenGL")
endif()

# Hide the console window on Windows for Release builds
if(WIN32)
    set_target_properties(${PROJECT_NAME} PROPERTIES
        WIN32_EXECUTABLE $<OR:$<CONFIG:Release>,$<CONFIG:MinSizeRel>>
    )

    if(MSVC)
        # This allows use of 'int main()' instead of 'WinMain' for consistency.
        target_link_options(${PROJECT_NAME} PRIVATE
            "$<$<AND:$<PLATFORM_ID:Windows>,$<OR:$<CONFIG:Release>,$<CONFIG:MinSizeRel>>>:/ENTRY:mainCRTStartup>"
        )
    endif()
endif()


